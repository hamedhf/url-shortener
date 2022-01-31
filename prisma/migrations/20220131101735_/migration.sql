-- AlterTable
CREATE SEQUENCE "url_id_seq";
ALTER TABLE "url" ALTER COLUMN "id" SET DEFAULT nextval('url_id_seq');
ALTER SEQUENCE "url_id_seq" OWNED BY "url"."id";
