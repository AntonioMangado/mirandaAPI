import fs from 'fs';
import { Data } from '../lib/interfaces';

function convertArrToCSV (arr: Data) {
    let csv = '';
    for (let i = 0; i < arr.length; i++) {
      for (let key in arr[i]) {
        csv += `${key}: ${arr[i][key]} `
      }
      csv += '\n';
    }
    return csv;
  }
  
  function writeCSVFile (filename: string, data: Data) {
      const files = convertArrToCSV(data);
      fs.writeFile(filename, files, "utf8", (err) => {
          if (err) {
              console.log(err);
          } else {
              console.log("File created succesfully")
          }
      })
  }