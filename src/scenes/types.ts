export type SceneId = 'hero' | 'cake' | 'album' | 'balloons' | 'gifts' | 'message' | 'final';

export interface SceneProps {
  onNext: () => void;
}
