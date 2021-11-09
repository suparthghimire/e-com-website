export const http_validation = (status, data) => {
  if (status === 200 || status === 201) {
    return {
      message: "success",
      detail: {
        status: status,
        data: data,
      },
    };
  } else {
    return {
      message: "error",
      detail: {
        status: status,
        data: data,
      },
    };
  }
};
