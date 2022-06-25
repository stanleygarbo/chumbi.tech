export interface IMoralisResponseResult {
  token_address: string;
  token_id: string;
  block_number_minted: string;
  owner_of: string;
  block_number: string;
  amount: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  synced_at: string;
  is_valid: number;
  syncing: number;
  frozen: number;
}

export interface IMoralisResponse {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: IMoralisResponseResult[];
  status: string;
}
