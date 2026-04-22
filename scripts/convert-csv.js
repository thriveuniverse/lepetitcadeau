import fs from 'fs';
import { parse } from 'csv-parse/sync';

const input = fs.readFileSync('C:/Users/julie/Downloads/EtsyListingsDownload.csv/EtsyListingsDownload.csv', 'utf8');
const records = parse(input, {
  columns: true,
  skip_empty_lines: true
});

const products = records.map((record, index) => {
  return {
    id: record.SKU || `prod_${index}`,
    title: record.TITLE,
    description: record.DESCRIPTION,
    price: parseFloat(record.PRICE),
    currency: record.CURRENCY_CODE,
    quantity: parseInt(record.QUANTITY, 10),
    tags: record.TAGS ? record.TAGS.split(',') : [],
    images: [
      record.IMAGE1, record.IMAGE2, record.IMAGE3, record.IMAGE4, record.IMAGE5,
      record.IMAGE6, record.IMAGE7, record.IMAGE8, record.IMAGE9, record.IMAGE10
    ].filter(Boolean),
  };
});

fs.mkdirSync('./src/data', { recursive: true });
fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
console.log(`Successfully generated ${products.length} products to src/data/products.json`);
