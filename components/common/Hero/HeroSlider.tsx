import { api } from '@/lib/fetcher';
import { Slider } from './Slider';

type SliderItem = {
  photo: string;
  photo_web: string;
  url: string | null;
  sort_order: number;
};

type SliderResponse = {
  data: SliderItem[];
};

export default async function HeroSlider() {
  const { data } = await api.get<SliderResponse>('/sliders', 3600);

  return (
    <div>
      <Slider sliders={data} />
    </div>
  );
}