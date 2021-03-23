interface IConfig {
  API_URL: string;
}

const config: IConfig = {
  API_URL: process.env.REACT_APP_API_URL || 'https://rslang-back.herokuapp.com',
}

export default config
