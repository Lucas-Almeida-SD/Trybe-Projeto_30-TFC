import { StatusCodes } from 'http-status-codes';

const getStatusCode = (message: string) => {
  switch (true) {
    case (message.includes('required') || message.includes('must')):
      return StatusCodes.BAD_REQUEST;
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

export default (message: string, code: number | null) => {
  let myCode = code;

  if (!code) {
    myCode = getStatusCode(message);
  }

  const myError = new Error(JSON.stringify({ code: myCode, message }));
  myError.name = 'errorObject';

  throw myError;
};
