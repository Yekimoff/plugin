import { format } from 'date-fns';
import {ru} from 'date-fns/locale';

export function formatDate(date, formatStr = 'PP') {
  return format(date, formatStr, {
    locale: ru,
  })
}