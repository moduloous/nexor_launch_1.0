import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

interface ImageData {
  uri: string;
  fileName: string;
  title: string;
  description: string;
  category: string;
  height: number;
}

const categories = [
  'Fashion', 'Food', 'Travel', 'Home', 'Art', 'Beauty', 'Fitness', 'Tech'
];

export default function UploadImagesScreen() {
  const router = useRouter();
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);

  async function pickImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newImages: ImageData[] = result.assets.map((asset, index) => ({
        uri: asset.uri,
        fileName: `image-${Date.now()}-${index}.jpg`,
        title: '',
        description: '',
        category: 'Fashion',
        height: Math.floor(Math.random() * (300 - 200 + 1)) + 200, // Random height between 200-300
      }));
      setImages([...images, ...newImages]);
      if (newImages.length > 0) {
        setCurrentImage(newImages[0]);
      }
    }
  }

  async function uploadToSupabase() {
    if (images.length === 0) {
      Alert.alert('No images', 'Please select images first');
      return;
    }

    // Check if all images have titles
    const missingTitles = images.filter(img => !img.title);
    if (missingTitles.length > 0) {
      Alert.alert('Missing Info', 'Please add titles to all images');
      return;
    }

    setUploading(true);

    try {
      for (const image of images) {
        // Upload image to Supabase Storage
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const fileExt = image.fileName.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('grid-images')
          .upload(filePath, arrayBuffer, {
            contentType: 'image/jpeg',
            upsert: false,
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          Alert.alert('Upload failed', uploadError.message);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('grid-images')
          .getPublicUrl(filePath);

        // Get category_id
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', image.category)
          .single();

        // Insert pin record
        const { error: insertError } = await supabase
          .from('pins')
          .insert({
            title: image.title,
            description: image.description || `Beautiful ${image.category} inspiration`,
            image_url: urlData.publicUrl,
            image_height: image.height,
            category_id: categoryData?.id,
            likes_count: Math.floor(Math.random() * 1000),
            is_published: true,
          });

        if (insertError) {
          console.error('Insert error:', insertError);
          Alert.alert('Database error', insertError.message);
        }
      }

      Alert.alert('Success!', `${images.length} images uploaded successfully!`, [
        {
          text: 'View Grid',
          onPress: () => router.push('/(tabs)/grid'),
        },
        {
          text: 'Upload More',
          onPress: () => setImages([]),
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  }

  function updateImageData(field: keyof ImageData, value: string) {
    if (!currentImage) return;
    
    const updatedImages = images.map(img =>
      img.uri === currentImage.uri
        ? { ...img, [field]: value }
        : img
    );
    setImages(updatedImages);
    setCurrentImage({ ...currentImage, [field]: value });
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Upload Images</Text>
        <Pressable
          onPress={uploadToSupabase}
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
          disabled={uploading || images.length === 0}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons name="cloud-upload" size={24} color="#fff" />
          )}
        </Pressable>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Pick Images Button */}
        <Pressable style={styles.pickButton} onPress={pickImages}>
          <Ionicons name="images" size={32} color="#fff" />
          <Text style={styles.pickButtonText}>
            {images.length === 0 ? 'Select Images' : `${images.length} Images Selected`}
          </Text>
        </Pressable>

        {/* Images Grid */}
        {images.length > 0 && (
          <View style={styles.imagesGrid}>
            {images.map((image, index) => (
              <Pressable
                key={image.uri}
                style={[
                  styles.imageCard,
                  currentImage?.uri === image.uri && styles.imageCardSelected,
                ]}
                onPress={() => setCurrentImage(image)}
              >
                <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                {image.title && (
                  <View style={styles.imageTitleBadge}>
                    <Text style={styles.imageTitleText} numberOfLines={1}>
                      {image.title}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        )}

        {/* Edit Current Image */}
        {currentImage && (
          <View style={styles.editSection}>
            <Text style={styles.sectionTitle}>Edit Image Details</Text>
            
            <Image source={{ uri: currentImage.uri }} style={styles.editPreview} />

            <TextInput
              style={styles.input}
              placeholder="Title *"
              value={currentImage.title}
              onChangeText={(text) => updateImageData('title', text)}
              placeholderTextColor="#999"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              value={currentImage.description}
              onChangeText={(text) => updateImageData('description', text)}
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.categoryChip,
                    currentImage.category === cat && styles.categoryChipSelected,
                  ]}
                  onPress={() => updateImageData('category', cat)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      currentImage.category === cat && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {images.length > 0 && (
          <View style={styles.instructions}>
            <Ionicons name="information-circle" size={20} color="#666" />
            <Text style={styles.instructionsText}>
              Tap an image to edit its details. All images must have a title before uploading.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadButtonDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  pickButton: {
    backgroundColor: '#007AFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  pickButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  imageCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  imageCardSelected: {
    borderColor: '#007AFF',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imageTitleBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 4,
  },
  imageTitleText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
  editSection: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  editPreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoriesScroll: {
    marginBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#000',
  },
  categoryChipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  instructions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  instructionsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});


