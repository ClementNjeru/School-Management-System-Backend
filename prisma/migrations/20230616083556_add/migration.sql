-- DropForeignKey
ALTER TABLE "FeePayment" DROP CONSTRAINT "FeePayment_studentId_fkey";

-- AddForeignKey
ALTER TABLE "FeePayment" ADD CONSTRAINT "FeePayment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
