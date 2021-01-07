import map from 'lodash/map';
import get from 'lodash/get';
import * as errorMessages from './errorMessages';

export interface ErrorResponse {
  response: {
    data: {
      errors?: ErrorArrayInput[];
      results?: {
        errors?: ErrorArrayInput[];
        message?: string;
      };
    };
  };
}

export interface ErrorArrayInput {
  field?: string;
  message: string;
  type: string;
}

export interface ErrorArrayOutput {
  field?: string;
  message: string;
}

export const parseErrorsArray = (
  errors: ErrorArrayInput[]
): ErrorArrayOutput[] =>
  map(errors, error => {
    const field = get(error, 'field');
    const errorType = get(error, 'type');
    const message = get(errorMessages, errorType)
      ? get(errorMessages, errorType)
      : get(error, 'message');
    return {
      field,
      message,
    };
  });

const parseApiError = (errorResponse: ErrorResponse): ErrorArrayOutput[] => {
  const errorsArray = get(errorResponse, 'response.data.errors')
    ? get(errorResponse, 'response.data.errors')
    : get(errorResponse, 'response.data.results.errors')
    ? get(errorResponse, 'response.data.results.errors')
    : get(errorResponse, 'response.data.results.message')
    ? [{ message: get(errorResponse, 'response.data.results.message') }]
    : [];

  return parseErrorsArray(errorsArray);
};

export default parseApiError;
