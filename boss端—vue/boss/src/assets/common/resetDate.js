import {formatDate,padDate} from "../js/date";
export default {
  dateNow:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),  //昨天
  dateYesterday:formatDate(new Date(new Date().getTime() - 24 * 3600 * 1000),'yyyy-MM-dd'),  //昨天
  dateSevenday: formatDate(new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),'yyyy-MM-dd'),  //近七天
  dateThirtyday: formatDate(new Date(new Date().getTime() - 30 * 24 * 3600 * 1000),'yyyy-MM-dd'),  //近30天
  minDate:new Date(2018, 8, 18),
  maxDate:new Date(new Date().getTime() - 24 * 3600 * 1000),
};
