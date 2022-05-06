import fs from 'fs';

export const readFile = async (fileName: string): Promise<string[]>  => {
  return new Promise((resolve, reject) => {
    let fetchData: string[] = [];
    fs.createReadStream(fileName, {encoding: 'utf-8'})
    .on("error", err => reject(err))
    .on('data', (data) => {
      // Remove square brackets, replace \r\n to \n and create arrayte
      fetchData = data.toString().replace(/\[/g, '').replace(/]/g, '').split('\r\n').join('\n').split('\n');
      // If the last item is empty, remove it from array
      if ((fetchData.length > 0) && (fetchData[fetchData.length - 1].trim() === '')) {
        fetchData.pop();
      }
    })
    .on("end", () => resolve(fetchData));
  });
}
