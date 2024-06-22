import { parseISO, format } from 'date-fns';

const useFormattedDate = (isoDate) => {
  if (!isoDate) {
    return { formattedDate: '', formattedTime: '' };
  }

  try {
    console.log('isoDate', isoDate);
    const date = parseISO(isoDate);
    console.log('date', date);
    const formattedDate = format(date, 'dd.MM.yyyy');
    const formattedTime = format(date, 'HH:mm');
    console.log('formattedDate', formattedDate);
    return { formattedDate, formattedTime };
  } catch (error) {
    console.error('Failed to format date', error);
    console.log('failed to format date');
    return { formattedDate: '', formattedTime: '' };
  }
};

export default useFormattedDate;
