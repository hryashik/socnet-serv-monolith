-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dialogsId" TEXT[] DEFAULT ARRAY[]::TEXT[];
