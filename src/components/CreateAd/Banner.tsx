import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Modal } from "./Modal";
import { Game } from "../../App";

export function CreateAdBanner({ games }: { games: Game[] }) {
  return (
    <div className="w-full rounded-lg bg-duo-gradient pt-1 mt-8">
      <div className=" bg-[#2A2634] px-8 py-6 rounded-md flex justify-between">
        <div>
          <h2 className="font-black text-2xl text-white">
            Não encontrou seu duo?
          </h2>
          <p className="text-zinc-400">
            Publique um anúncio para encontrar novos players!
          </p>
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="py-4 px-4 bg-violet-500 rounded-md text-white font-medium hover:bg-violet-700 flex gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
          <Modal games={games} />
        </Dialog.Root>
      </div>
    </div>
  );
}
