/*
  Warnings:

  - The primary key for the `Dialog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Dialog` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `dialogId` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_DialogToUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dialogId_fkey";

-- DropForeignKey
ALTER TABLE "_DialogToUser" DROP CONSTRAINT "_DialogToUser_A_fkey";

-- AlterTable
ALTER TABLE "Dialog" DROP CONSTRAINT "Dialog_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Dialog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "dialogId",
ADD COLUMN     "dialogId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_DialogToUser" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_DialogToUser_AB_unique" ON "_DialogToUser"("A", "B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "Dialog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DialogToUser" ADD CONSTRAINT "_DialogToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Dialog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
