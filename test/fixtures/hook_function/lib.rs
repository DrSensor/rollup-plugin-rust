#[link(wasm_import_module = "hook")]
extern {
    fn before(a: u8, b: u8);
    fn after(c: u8);
}

#[no_mangle]
pub fn add(a: u8, b: u8) -> u8 {
    unsafe { before(a, b) };
    let c = a + b;
    unsafe { after(c) };
    return c;
}
