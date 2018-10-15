import instantiateWasm from './lib.rs';

async function calculator() {
  const { instance } = await instantiateWasm();
  return instance.exports;
}

calculator().then(({ add, div }) => {
  console.log(add(1, 2));
  console.log(div(4, 2));
});

export default calculator;
