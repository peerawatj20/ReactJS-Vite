module.exports = {
  // ...กฎ Prettier อื่นๆ ของคุณ เช่น semi, singleQuote ...
  semi: true,
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  // --- เพิ่มแค่ส่วนนี้ ---
  importOrder: [
    '^react', // React มาก่อนเสมอ
    '<THIRD_PARTY_MODULES>',
    '^@/shared/(.*)$',
    '^@/features/(.*)$',
    '^@/widgets/(.*)$',
    '^@/pages/(.*)$',
    '^@/locales/(.*)$',
    '^[./]', // Relative imports (../ หรือ ./)
  ],
  importOrderSeparation: true, // ให้มีบรรทัดว่างคั่นระหว่างกลุ่ม
  importOrderSortSpecifiers: true, // จัดเรียง import ในวงเล็บปีกกา { a, b, c }
};
