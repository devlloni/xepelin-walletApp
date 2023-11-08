import { v4 as uuidv4 } from 'uuid';

const generateUniqueAccountNumber = () => {
    const uuid = uuidv4();
    const numericString = uuid.replace(/[^0-9]/g, '');
    const paddedNumericString = numericString.padStart(10, '0');
    const uniqueNumericId = paddedNumericString.slice(0, 10);
    return parseInt(uniqueNumericId, 10);
}

export {
    generateUniqueAccountNumber,
}
