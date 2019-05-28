using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DbContract.Migrations
{
    public partial class removeAesFromDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AesIV",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AesKey",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "AesIV",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "AesKey",
                table: "Users",
                nullable: true);
        }
    }
}
