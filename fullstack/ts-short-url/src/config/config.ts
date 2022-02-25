
export interface Config {
    redisUrl: string,
    port: number,
    cacheTime: number,
    urlFilter: string,
    bfbyte: number,
    bfHashCnt: number,
    db_Type: string,
    db_name: string,
    db_username: string,
    db_password: string,
    db_host: string,
    db_port: number,
    db_ssl: false
  }

  const cfgs: Config = {
    redisUrl: "redis://localhost:6379",
    port: 80,
    cacheTime: 1000,
    urlFilter: 'filter',
    bfbyte: 32*256,
    bfHashCnt: 16,
    db_Type: 'mysql',
    db_name: 'short_url',
    db_username: 'su',
    db_password: 'su',
    db_host: '127.0.0.1',
    db_port: 3306,
    db_ssl: false
  }
  
  export default cfgs