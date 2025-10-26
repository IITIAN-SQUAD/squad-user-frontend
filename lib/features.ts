/**
 * Feature Flag Configuration
 * Controls which features are visible in the application based on environment variables
 */

export type FeatureName = 
  | 'blog' 
  | 'practice' 
  | 'analytics' 
  | 'revision' 
  | 'challenge' 
  | 'pyq' 
  | 'coaching' 
  | 'doubts';

export interface Feature {
  name: FeatureName;
  label: string;
  path: string;
  description: string;
}

export const FEATURES: Record<FeatureName, Feature> = {
  blog: {
    name: 'blog',
    label: 'Blog',
    path: '/blog',
    description: 'Latest insights, tips, and success stories'
  },
  practice: {
    name: 'practice',
    label: 'Practice',
    path: '/dashboard',
    description: 'Smart practice with curated questions'
  },
  analytics: {
    name: 'analytics',
    label: 'Analytics',
    path: '/dashboard/analytics',
    description: 'Track your performance and progress'
  },
  revision: {
    name: 'revision',
    label: 'Revision',
    path: '/dashboard/revision',
    description: 'Revise concepts efficiently'
  },
  challenge: {
    name: 'challenge',
    label: 'Challenge',
    path: '/dashboard/challenge',
    description: 'Compete with peers in live challenges'
  },
  pyq: {
    name: 'pyq',
    label: 'PYQ Papers',
    path: '/dashboard/pyq',
    description: 'Previous year question papers'
  },
  coaching: {
    name: 'coaching',
    label: 'AI Coaching',
    path: '/dashboard/coaching',
    description: 'Personalized AI-powered guidance'
  },
  doubts: {
    name: 'doubts',
    label: 'Doubts',
    path: '/dashboard/doubts',
    description: 'Get instant doubt resolution'
  }
};

/**
 * Get enabled features from environment variable
 * Format: NEXT_PUBLIC_ENABLED_FEATURES=blog,practice,analytics
 */
function getEnabledFeaturesFromEnv(): Set<FeatureName> {
  const envFeatures = process.env.NEXT_PUBLIC_ENABLED_FEATURES || '';
  
  // Debug: Log what we're reading from environment
  console.log('🔍 Feature Flags Debug:');
  console.log('  Raw env value:', JSON.stringify(envFeatures));
  console.log('  Trimmed:', JSON.stringify(envFeatures.trim()));
  console.log('  Is empty?:', !envFeatures.trim());
  
  if (!envFeatures.trim()) {
    // If no features specified, enable all by default (for development)
    console.log('  ⚠️  No features specified - enabling ALL features by default');
    return new Set(Object.keys(FEATURES) as FeatureName[]);
  }
  
  const features = envFeatures
    .split(',')
    .map(f => f.trim().toLowerCase())
    .filter(f => f in FEATURES) as FeatureName[];
  
  console.log('  ✅ Enabled features:', features);
  
  return new Set(features);
}

const enabledFeatures = getEnabledFeaturesFromEnv();

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: FeatureName): boolean {
  return enabledFeatures.has(feature);
}

/**
 * Get all enabled features
 */
export function getEnabledFeatures(): Feature[] {
  return Array.from(enabledFeatures).map(name => FEATURES[name]);
}

/**
 * Get feature by name
 */
export function getFeature(name: FeatureName): Feature | undefined {
  return FEATURES[name];
}

/**
 * Check if any features are enabled
 */
export function hasEnabledFeatures(): boolean {
  return enabledFeatures.size > 0;
}
