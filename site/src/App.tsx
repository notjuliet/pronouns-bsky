import { createSignal, For, Show, type Component } from "solid-js";
import { PRONOUNS, METANOUNS, NEOPRONOUNS } from "./constants.js";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 1;
const basePostUrl =
  isSafari && isTouchDevice
    ? "bluesky:///profile/pronouns.adorable.mom/post/"
    : "https://bsky.app/profile/pronouns.adorable.mom/post/";

const [search, setSearch] = createSignal("");

const PronounsList: Component<{ search: string }> = (props) => {
  const searchFilter = (arr: string[]) =>
    arr.filter(
      (x) =>
        x.includes(props.search.replaceAll(" ", "/")) ||
        x.includes(props.search),
    );

  return (
    <div class="screen flex flex-col sm:h-[70svh] sm:w-[32rem] sm:flex-row sm:gap-x-4">
      <div class="w-full overflow-auto sm:flex-none sm:basis-1/3">
        <For each={searchFilter(Object.keys(PRONOUNS))}>
          {(pronoun, index) => (
            <div>
              <Show when={index() === 0}>
                <div class="my-1 text-center text-xl">Pronouns</div>
              </Show>
              <div
                classList={{
                  "border-b border-b-zinc-600":
                    index() !== searchFilter(Object.keys(PRONOUNS)).length - 1,
                }}
              >
                <a
                  href={basePostUrl + PRONOUNS[pronoun]}
                  class="block h-full w-full py-3 text-center text-sky-500 hover:bg-zinc-800"
                >
                  {pronoun}
                </a>
              </div>
            </div>
          )}
        </For>
      </div>
      <div class="w-full overflow-auto sm:flex-none sm:basis-1/3">
        <For each={searchFilter(Object.keys(METANOUNS))}>
          {(pronoun, index) => (
            <div>
              <Show when={index() === 0}>
                <div class="my-1 text-center text-xl">Meta</div>
              </Show>
              <div
                classList={{
                  "border-b border-b-zinc-600":
                    index() !== searchFilter(Object.keys(METANOUNS)).length - 1,
                }}
              >
                <a
                  href={basePostUrl + METANOUNS[pronoun]}
                  class="block h-full w-full py-3 text-center text-sky-500 hover:bg-zinc-800"
                >
                  {pronoun}
                </a>
              </div>
            </div>
          )}
        </For>
      </div>
      <div class="w-full overflow-auto sm:flex-none sm:basis-1/3">
        <For each={searchFilter(Object.keys(NEOPRONOUNS))}>
          {(pronoun, index) => (
            <div>
              <Show when={index() === 0}>
                <div class="my-1 text-center text-xl">Neopronouns</div>
              </Show>
              <div
                classList={{
                  "border-b border-b-zinc-600":
                    index() !==
                    searchFilter(Object.keys(NEOPRONOUNS)).length - 1,
                }}
              >
                <a
                  href={basePostUrl + NEOPRONOUNS[pronoun]}
                  class="block h-full w-full py-3 text-center text-sky-500 hover:bg-zinc-800"
                >
                  {pronoun}
                </a>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

const PronounsSearch: Component = () => {
  return (
    <div class="m-5 flex flex-col items-center">
      <div>
        <input
          type="text"
          placeholder="Search pronouns"
          class="mb-3 rounded-md bg-zinc-700 px-2 py-1 text-zinc-200"
          onInput={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

const App: Component = () => {
  return (
    <div class="flex flex-col items-center text-slate-200">
      <div class="py-6 text-center text-3xl">Pronouns Labeler Search</div>
      <div>
        <a
          href={basePostUrl + "3kwsqucto3j2a"}
          class="text-xl text-sky-500 hover:underline"
        >
          Post to remove labels
        </a>
      </div>
      <PronounsSearch />
      <PronounsList search={search()} />
    </div>
  );
};

export default App;
