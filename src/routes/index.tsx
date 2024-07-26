import {
  type RouteDefinition,
  type RouteSectionProps,
  action,
  cache,
  createAsync,
  json,
} from '@solidjs/router';
import { For } from 'solid-js';
import { Button } from '~/components/ui/button';
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from '~/components/ui/text-field';
import { db } from '~/lib/drizzle/db';
import { type SelectNote, note } from '~/lib/drizzle/schema';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { FaSolidTrash } from 'solid-icons/fa';
import { eq } from 'drizzle-orm';

// get all notes from the database
const getNotes = cache(async () => {
  'use server';
  return ((await db.select().from(note)) as SelectNote[]) || [];
}, 'notes');

// create a new note
const createNoteAction = action(async (formData: FormData) => {
  'use server';

  if (!formData.get('note')) {
    return json({
      msg: 'Note is required',
    });
  }

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
  const notes = createAsync<SelectNote[]>(() => getNotes(), {
    initialValue: [],
  });

  let inputRef!: HTMLInputElement;

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>

      <form
        action={createNoteAction}
        method="post"
        class="flex flex-col gap-2 max-w-3xl mx-auto items-start"
        onSubmit={(e) => {
          if (!inputRef.value.trim()) e.preventDefault();

          setTimeout(() => {
            inputRef.value = '';
          });
        }}
      >
        <TextField class="space-y-1 w-full text-left">
          <TextFieldLabel
            for="input"
            class="text-left justify-start items-start"
          >
            Name
          </TextFieldLabel>
          <TextFieldInput
            placeholder="Type something here"
            name="note"
            type="text"
            ref={inputRef}
          />
        </TextField>
        <Button type="submit">Add Note</Button>
      </form>
      <div class="grid grid-cols-3 gap-4 max-w-6xl mx-auto pt-12">
        <For each={notes()}>
          {(note) => (
            <Card>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={deleteNoteAction} method="post">
                  <input type="hidden" name="id" value={note.id} />
                  <Button type="submit" variant="ghost">
                    <FaSolidTrash class="text-red-500 cursor-pointer" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </For>
      </div>
    </main>
  );
}
