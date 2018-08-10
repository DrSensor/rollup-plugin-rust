// @flow

const pi = (s: number) => s * 3.14;

export default function(n: number) {
  const a = { sd: pi(2) };
  console.log('hello world!!', a);
  return a.sd + n;
}
