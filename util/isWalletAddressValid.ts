export function isWalletAddressValid(address: string | string[]) {
  return /^0x[a-zA-Z0-9]{40}$/.test(address.toString());
}
