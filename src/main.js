// @flow

const pi = (s: number) => s * 3.14;

export default function() {
  const a = { sd: pi(2) };
  while (process.env.NODE) {
    console.log('hello world!!', a);
  }
}
