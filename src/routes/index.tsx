import {
  RouteDefinition,
  RouteSectionProps,
  action,
  cache,
  createAsyncStore,
  json,
} from '@solidjs/router';
import { For } from 'solid-js';
import { Button } from '~/components/ui/button';
import { FormLabel } from '~/components/ui/form-label';
import { Input } from '~/components/ui/input';
import { db } from '~/lib/drizzle/db';
import { SelectNote, note } from '~/lib/drizzle/schema';
import * as Card from '~/components/ui/card';
import { Trash2Icon } from 'lucide-solid';
import { eq } from 'drizzle-orm';

// get all notes from the database
const getNotes = cache(async () => {
  'use server';
  return ((await db.select().from(note)) as SelectNote[]) || [];
}, 'notes');

// create a new note
const createNoteAction = action(async (formData: FormData) => {
  'use server';

  /// Insert a new note into the database
  await db.insert(note).values({
    title: formData.get('note') as string,
  });

  return json({
    msg: 'Note created',
  });
});

// delete a note
const deleteNoteAction = action(async (formData: FormData) => {
  'use server';
  const id = formData.get('id') as string;
  console.log(id);

  /// Delete a note from the database
  await db.delete(note).where(eq(note.id, id));

  return json({
    msg: 'Note deleted',
  });
});

export const route = {
  load: () => getNotes(),
} satisfies RouteDefinition;

export default function Home(props: RouteSectionProps) {
  const notes = createAsyncStore<SelectNote[]>(() => getNotes(), {
    initialValue: [],
    deferStream: true,
  });

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>

      <form
        action={createNoteAction}
        method="post"
        class="flex flex-col gap-2 max-w-3xl mx-auto items-start"
      >
        <FormLabel for="input">Name</FormLabel>
        <Input placeholder="Type something here" name="note" />
        <Button type="submit">Add Note</Button>
      </form>
      <div class="grid grid-cols-3 gap-4 max-w-6xl mx-auto pt-12">
        <For each={notes()}>
          {(note) => (
            <Card.Root>
              <Card.Header>
                <Card.Title>{note.title}</Card.Title>
                <Card.Description>
                  <form action={deleteNoteAction} method="post">
                    <input type="hidden" name="id" value={note.id} />
                    <Button type="submit" variant="ghost">
                      <Trash2Icon class="text-red-500 cursor-pointer" />
                    </Button>
                  </form>
                </Card.Description>
              </Card.Header>
            </Card.Root>
          )}
        </For>
      </div>
    </main>
  );
}
