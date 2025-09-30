import { popularBrands } from './brands';
import { defaultCategories } from './categories';

// Function to detect brand from item name
export function detectBrand(itemName: string): string {
  const normalizedName = itemName.toLowerCase();
  
  // Find exact brand matches first
  for (const brand of popularBrands) {
    if (normalizedName.includes(brand.toLowerCase())) {
      return brand;
    }
  }
  
  return '';
}

// Function to detect category from item name  
export function detectCategory(itemName: string): string {
  const normalizedName = itemName.toLowerCase();
  
  // Category keywords mapping
  const categoryKeywords = {
    'Sneakers': ['sneaker', 'trainer', 'running', 'basketball', 'jordan', 'air max', 'nike', 'adidas'],
    'Boots': ['boot', 'chelsea', 'combat', 'hiking', 'timberland'],
    'Sandals': ['sandal', 'flip flop', 'slider', 'birkenstock'],
    'Dress Shoes': ['oxford', 'loafer', 'dress shoe', 'formal'],
    'Athletic Shoes': ['athletic', 'gym', 'cross training', 'fitness'],
    
    'T-Shirts': ['t-shirt', 'tee', 'tank top', 'crop top'],
    'Shirts': ['shirt', 'blouse', 'button up', 'dress shirt'],
    'Hoodies': ['hoodie', 'sweatshirt', 'pullover'],
    'Sweaters': ['sweater', 'jumper', 'cardigan', 'knit'],
    
    'Jeans': ['jean', 'denim'],
    'Pants': ['pant', 'trouser', 'chino', 'slack'],
    'Shorts': ['short', 'bermuda'],
    'Skirts': ['skirt', 'mini skirt', 'maxi skirt'],
    'Leggings': ['legging', 'tight', 'yoga pant'],
    
    'Dresses': ['dress', 'gown', 'frock'],
    'Jackets': ['jacket', 'blazer', 'coat'],
    'Coats': ['coat', 'parka', 'trench'],
    'Vests': ['vest', 'waistcoat', 'gilet'],
    
    'Accessories': ['belt', 'scarf', 'glove', 'hat', 'cap', 'beanie'],
    'Bags': ['bag', 'backpack', 'handbag', 'purse', 'wallet', 'clutch'],
    'Watches': ['watch', 'timepiece', 'smartwatch'],
    'Jewelry': ['ring', 'necklace', 'bracelet', 'earring', 'chain'],
    'Hats': ['hat', 'cap', 'beanie', 'snapback', 'bucket hat'],
    
    'Electronics': ['phone', 'laptop', 'tablet', 'headphone', 'speaker', 'camera', 'gaming', 'console', 'airpod', 'iphone', 'ipad', 'macbook', 'samsung', 'playstation', 'xbox', 'nintendo'],
    'Collectibles': ['card', 'figure', 'collectible', 'vintage', 'rare', 'limited edition', 'pokemon', 'funko'],
    'Home & Living': ['candle', 'pillow', 'blanket', 'decor', 'furniture', 'lamp', 'mirror']
  };
  
  // Check for category matches
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (normalizedName.includes(keyword)) {
        return category;
      }
    }
  }
  
  return '';
}

// Function to parse item name and extract brand and category
export function parseItemName(itemName: string): {
  detectedBrand: string;
  detectedCategory: string;
} {
  return {
    detectedBrand: detectBrand(itemName),
    detectedCategory: detectCategory(itemName)
  };
}