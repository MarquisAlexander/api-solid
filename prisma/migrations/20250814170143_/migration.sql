/*
  Warnings:

  - You are about to drop the column `gym_id` on the `check_in` table. All the data in the column will be lost.
  - Added the required column `gymId` to the `check_in` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "check_in" DROP CONSTRAINT "check_in_gym_id_fkey";

-- AlterTable
ALTER TABLE "check_in" DROP COLUMN "gym_id",
ADD COLUMN     "gymId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gyms" ALTER COLUMN "phone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
