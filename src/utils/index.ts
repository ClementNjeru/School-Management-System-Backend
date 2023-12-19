module.exports.FormatData = (data: unknown) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};

export const validateKenyanPhoneNumber = (phoneNumber: string) =>
  phoneNumber &&
  /^(254|\+254|0)+(((1)+(?:[012345][0-9]))|((7)+(?:(?:[0129][0-9])|(?:[4][0123568])|(?:[5][789])|(?:[6][89]))))+(?:[0-9]{6})$/.test(
    phoneNumber
  );

const phoneRegex = /^(\+?254|0|01)?([1|7])([0-9]{8})$/;

const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export { phoneRegex, emailRegex };
