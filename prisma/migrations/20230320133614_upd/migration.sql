/*
  Warnings:

  - The primary key for the `Dialog` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_dialogId_fkey";

-- DropForeignKey
ALTER TABLE "_DialogToUser" DROP CONSTRAINT "_DialogToUser_A_fkey";

-- AlterTable
ALTER TABLE "Dialog" DROP CONSTRAINT "Dialog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Dialog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Dialog_id_seq";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "dialogId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_DialogToUser" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "Dialog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DialogToUser" ADD CONSTRAINT "_DialogToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Dialog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
