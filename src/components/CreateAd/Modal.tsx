import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Check, GameController } from "phosphor-react";
import { Button, Input, Label } from "../Form/InputForm";
import { Game } from "../../App";

import { FormEvent, useState } from "react";

import axios from "axios";

export function Modal({ games }: { games: Game[] }) {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    try {
      if (!data.game && !data.name) {
        throw new Error("Game e name não informados");
      }

      await axios.post(
        `https://server-nlw-esports.herokuapp.com/${data.game}/ads`,
        {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: useVoiceChannel,
        }
      );

      alert("Ad criado com sucesso.");
    } catch (err) {
      console.log(err);
      alert("Ad não criado");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
      <Dialog.Content className="fixed max-w-lg px-10 py-8 bg-[#2A2634] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <Dialog.Title className="font-black text-3xl mb-8">
          Publique um anúncio
        </Dialog.Title>
        <form onSubmit={handleCreateAd} className="grid gap-4">
          <div>
            <Label htmlFor="game">Qual o game?</Label>
            <select
              id="game"
              name="game"
              className="px-4 py-3 bg-zinc-900 rounded w-full"
              defaultValue="default"
            >
              <option value="default" disabled>
                Selecione o game que deseja jogar
              </option>
              {games.map(game => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="name">Seu nome (ou nickname)</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="yearsPlaying">Joga há quantos anos?</Label>
              <Input
                type="text"
                id="yearsPlaying"
                name="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div>
              <Label htmlFor="discord">Qual seu Discord?</Label>
              <Input
                type="text"
                id="discord"
                name="discord"
                placeholder="Usuario#0000 "
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Quando costuma jogar?</Label>
              <ToggleGroup.Root
                type="multiple"
                value={weekDays}
                onValueChange={setWeekDays}
                className="grid grid-cols-4 gap-y-2"
              >
                {[
                  "Domingo",
                  "Segunda",
                  "Terça",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sábado",
                ].map((weekDay, index) => (
                  <ToggleGroup.Item
                    key={index}
                    value={index + ""}
                    title={weekDay}
                    className={`w-10 h-10 px-3 py-2 font-bold rounded hover:bg-black/80 transition-colors ${
                      weekDays.includes(index + "")
                        ? "bg-violet-500"
                        : "bg-zinc-900"
                    }`}
                  >
                    {String(weekDay).slice(0, 1)}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
            <div>
              <Label htmlFor="hourStart">Qual horário do dia?</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  id="hourStart"
                  name="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  id="hourEnd"
                  name="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Checkbox.Root
              className="h-6 w-6 p-1 rounded bg-zinc-900"
              id="useVoiceChannel"
              onCheckedChange={isChecked => {
                if (isChecked === true) setUseVoiceChannel(true);
                else if (isChecked === false) setUseVoiceChannel(false);
              }}
            >
              <Checkbox.Indicator className="w-4 h-4 text-emerald-400">
                <Check />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="useVoiceChannel" className="font-semibold">
              Costumo me conectar ao chat de voz
            </label>
          </div>

          <footer className="flex gap-4 mt-8 justify-end">
            <Dialog.Close>
              <Button bgColor="bg-zinc-500" hoverBgColor="bg-zinc-700">
                Cancelar
              </Button>
            </Dialog.Close>
            <Button
              bgColor="bg-violet-500"
              hoverBgColor="bg-violet-700"
              type="submit"
            >
              <GameController size={24} />
              Encontrar Duo
            </Button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
