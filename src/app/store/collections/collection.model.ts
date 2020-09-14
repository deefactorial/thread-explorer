
export interface Collection {
  dbid: Uint8Array | string,
  config?: CollectionConfig
}

export interface CollectionConfig {
  name: string,
  schema?: any,
  indexesList?: Array<Index>,
}

export interface Index {
  path: string,
  unique: boolean,
}