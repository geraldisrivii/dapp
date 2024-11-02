const API_URL = "__REPL__SERVER_API_ENDPOINT";

const events: { name: string; obj: EventSource }[] = [];

export function event(name: string, src: string, callback?: (value: any) => void) {
  src = src.replace("/", "");

  console.log(API_URL);

  events.push({
    name,
    obj: new EventSource(API_URL + src),
  });

  if (callback) {
    addEventCallback(name, callback);
  }
}

export function addEventCallback(name: string, callback: (value: any) => void) {
  const event = events.find((e) => e.name === name);

  if (!event) {
    throw new Error("Event not found");
  }

  event.obj.addEventListener("message", (event) => {
    callback(JSON.parse(event.data));
  });
}
