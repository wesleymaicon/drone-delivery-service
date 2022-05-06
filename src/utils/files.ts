import fs from 'fs';

export const readFile = async (fileName: string): Promise<string[]>  => {
  return new Promise((resolve, reject) => {
    let fetchData: string[] = [];
    fs.createReadStream(fileName, {encoding: 'utf-8'})
    .on("error", err => reject(err))
    .on('data', (data) => {
      // Remove square brackets and create array
      fetchData = data.toString().replace(/\[/g, '').replace(/]/g, '').split('\n');
      // If the last item is empty, remove it from array
      if ((fetchData.length > 0) && (fetchData[fetchData.length - 1].trim() === '')) {
        fetchData.pop();
      }
    })
    .on("end", () => resolve(fetchData));
  });
}
