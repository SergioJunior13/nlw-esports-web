interface GameBannerProps {
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  };
}

export function GameBanner({ title, bannerUrl, _count }: GameBannerProps) {
  return (
    <a
      href="#"
      className="relative overflow-hidden rounded-lg active:brightness-50   hover:brightness-50 transition-all"
    >
      <img src={bannerUrl} className="w-full" />
      <div className=" pt-16 pb-4 px-4 w-full bg-black-gradient absolute bottom-0 right-0 text-white">
        <strong className="font-bold">{title}</strong>
        <p className="text-zinc-300 text-sm">{_count.Ads} anúncio(s)</p>
      </div>
    </a>
  );
}
