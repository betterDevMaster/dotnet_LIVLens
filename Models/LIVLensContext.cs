using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LIVLens.Models
{
    public partial class LIVLensContext : DbContext
    {
        public LIVLensContext()
        {
        }

        public LIVLensContext(DbContextOptions<LIVLensContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BrandDim> BrandDims { get; set; } = null!;
        public virtual DbSet<BrandModelDim> BrandModelDims { get; set; } = null!;
        public virtual DbSet<ClubDim> ClubDims { get; set; } = null!;
        public virtual DbSet<ClubDimRaw> ClubDimRaws { get; set; } = null!;
        public virtual DbSet<EventDim> EventDims { get; set; } = null!;
        public virtual DbSet<EventPlayerDim> EventPlayerDims { get; set; } = null!;
        public virtual DbSet<PlayerDim> PlayerDims { get; set; } = null!;
        public virtual DbSet<ProductTypeDim> ProductTypeDims { get; set; } = null!;
        public virtual DbSet<SurveyFact> SurveyFacts { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=liv-tour.cdodhwngj1sk.us-east-1.rds.amazonaws.com,3306;initial catalog=liv_survey;persist security info=False;user id=admin;password=Livtour2022", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.28-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<BrandDim>(entity =>
            {
                entity.HasKey(e => e.BrandId)
                    .HasName("PRIMARY");

                entity.ToTable("BRAND_DIM");

                entity.Property(e => e.BrandId).HasColumnName("BRAND_ID");

                entity.Property(e => e.AddDate)
                    .HasColumnType("datetime")
                    .HasColumnName("ADD_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Brand)
                    .HasMaxLength(45)
                    .HasColumnName("BRAND");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("UPDATE_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<BrandModelDim>(entity =>
            {
                entity.HasKey(e => e.BrandModelId)
                    .HasName("PRIMARY");

                entity.ToTable("BRAND_MODEL_DIM");

                entity.Property(e => e.BrandModelId).HasColumnName("BRAND_MODEL_ID");

                entity.Property(e => e.AddDate)
                    .HasColumnType("datetime")
                    .HasColumnName("ADD_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Brand)
                    .HasMaxLength(64)
                    .HasColumnName("BRAND");

                entity.Property(e => e.Model)
                    .HasMaxLength(64)
                    .HasColumnName("MODEL");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("UPDATE_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<ClubDim>(entity =>
            {
                entity.HasKey(e => e.ClubId)
                    .HasName("PRIMARY");

                entity.ToTable("CLUB_DIM");

                entity.Property(e => e.ClubId).HasColumnName("CLUB_ID");

                entity.Property(e => e.BrandId).HasColumnName("BRAND_ID");

                entity.Property(e => e.Manufacturer)
                    .HasMaxLength(45)
                    .HasColumnName("MANUFACTURER");

                entity.Property(e => e.Model).HasColumnName("MODEL");
            });

            modelBuilder.Entity<ClubDimRaw>(entity =>
            {
                entity.HasKey(e => e.ClubId)
                    .HasName("PRIMARY");

                entity.ToTable("CLUB_DIM_RAW");

                entity.Property(e => e.ClubId).HasColumnName("CLUB_ID");

                entity.Property(e => e.ClubNum)
                    .HasMaxLength(45)
                    .HasColumnName("CLUB_NUM");

                entity.Property(e => e.GolfRules)
                    .HasMaxLength(8)
                    .HasColumnName("GOLF_RULES");

                entity.Property(e => e.GrooveRules)
                    .HasMaxLength(8)
                    .HasColumnName("GROOVE_RULES");

                entity.Property(e => e.Loft).HasColumnName("LOFT");

                entity.Property(e => e.Manufacturer)
                    .HasMaxLength(45)
                    .HasColumnName("MANUFACTURER");

                entity.Property(e => e.Model)
                    .HasMaxLength(64)
                    .HasColumnName("MODEL");
            });

            modelBuilder.Entity<EventDim>(entity =>
            {
                entity.HasKey(e => e.EventId)
                    .HasName("PRIMARY");

                entity.ToTable("EVENT_DIM");

                entity.Property(e => e.EventId).HasColumnName("EVENT_ID");

                entity.Property(e => e.AddDate)
                    .HasColumnType("datetime")
                    .HasColumnName("ADD_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.City)
                    .HasMaxLength(45)
                    .HasColumnName("CITY");

                entity.Property(e => e.Country)
                    .HasMaxLength(8)
                    .HasColumnName("COUNTRY");

                entity.Property(e => e.CourseName)
                    .HasMaxLength(45)
                    .HasColumnName("COURSE_NAME");

                entity.Property(e => e.EventDate)
                    .HasColumnType("datetime")
                    .HasColumnName("EVENT_DATE");

                entity.Property(e => e.EventName)
                    .HasMaxLength(45)
                    .HasColumnName("EVENT_NAME");

                entity.Property(e => e.State)
                    .HasMaxLength(45)
                    .HasColumnName("STATE");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("UPDATE_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<EventPlayerDim>(entity =>
            {
                entity.HasKey(e => e.EventPlayerId)
                    .HasName("PRIMARY");

                entity.ToTable("EVENT_PLAYER_DIM");

                entity.HasIndex(e => e.EventId, "FK_EVENT_ID_idx");

                entity.HasIndex(e => e.PlayerId, "FK_PLAYER_ID_idx");

                entity.Property(e => e.EventPlayerId).HasColumnName("EVENT_PLAYER_ID");

                entity.Property(e => e.AddDate)
                    .HasColumnType("datetime")
                    .HasColumnName("ADD_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.EventId).HasColumnName("EVENT_ID");

                entity.Property(e => e.PlayedInd)
                    .HasColumnName("PLAYED_IND")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.PlayerId).HasColumnName("PLAYER_ID");

                entity.Property(e => e.TeeTime)
                    .HasColumnType("datetime")
                    .HasColumnName("TEE_TIME");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("UPDATE_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.EventPlayerDims)
                    .HasForeignKey(d => d.EventId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EVENT_PLAYER_DIM_EVENT_ID");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.EventPlayerDims)
                    .HasForeignKey(d => d.PlayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EVENT_PLAYER_DIM_PLAYER_ID");
            });

            modelBuilder.Entity<PlayerDim>(entity =>
            {
                entity.HasKey(e => e.PlayerId)
                    .HasName("PRIMARY");

                entity.ToTable("PLAYER_DIM");

                entity.Property(e => e.PlayerId).HasColumnName("PLAYER_ID");

                entity.Property(e => e.AddDate)
                    .HasColumnType("datetime")
                    .HasColumnName("ADD_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Amateur).HasColumnName("AMATEUR");

                entity.Property(e => e.CountryCode)
                    .HasMaxLength(45)
                    .HasColumnName("COUNTRY_CODE");

                entity.Property(e => e.CountryName)
                    .HasMaxLength(45)
                    .HasColumnName("COUNTRY_NAME");

                entity.Property(e => e.Dob)
                    .HasMaxLength(45)
                    .HasColumnName("DOB");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(45)
                    .HasColumnName("FIRST_NAME");

                entity.Property(e => e.Gender)
                    .HasMaxLength(8)
                    .HasColumnName("GENDER");

                entity.Property(e => e.LastName)
                    .HasMaxLength(45)
                    .HasColumnName("LAST_NAME");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("UPDATE_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<ProductTypeDim>(entity =>
            {
                entity.HasKey(e => e.ProductTypeId)
                    .HasName("PRIMARY");

                entity.ToTable("PRODUCT_TYPE_DIM");

                entity.Property(e => e.ProductTypeId).HasColumnName("PRODUCT_TYPE_ID");

                entity.Property(e => e.AddDate)
                    .HasColumnType("datetime")
                    .HasColumnName("ADD_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.ProductCategory)
                    .HasMaxLength(45)
                    .HasColumnName("PRODUCT_CATEGORY");

                entity.Property(e => e.ProductSubCategory)
                    .HasMaxLength(45)
                    .HasColumnName("PRODUCT_SUB_CATEGORY");

                entity.Property(e => e.ProductType)
                    .HasMaxLength(45)
                    .HasColumnName("PRODUCT_TYPE");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("UPDATE_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<SurveyFact>(entity =>
            {
                entity.HasKey(e => e.SurveyId)
                    .HasName("PRIMARY");

                entity.ToTable("SURVEY_FACT");

                entity.HasIndex(e => e.ProductTypeId, "FK_PRODUCT_TYPE_ID_idx");

                entity.HasIndex(e => e.BrandId, "FK_SURVEY_FACT_BRAND_MODEL_ID_idx");

                entity.HasIndex(e => e.ClubId, "FK_SURVEY_FACT_CLUB_ID_idx");

                entity.HasIndex(e => e.EventPlayerId, "FK_SURVEY_FACT_EVENT_PLAYER_ID_idx");

                entity.Property(e => e.SurveyId).HasColumnName("SURVEY_ID");

                entity.Property(e => e.AddDate)
                    .HasColumnType("datetime")
                    .HasColumnName("ADD_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.BrandId).HasColumnName("BRAND_ID");

                entity.Property(e => e.ClubId).HasColumnName("CLUB_ID");

                entity.Property(e => e.EventPlayerId).HasColumnName("EVENT_PLAYER_ID");

                entity.Property(e => e.ProductTypeId).HasColumnName("PRODUCT_TYPE_ID");

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("UPDATE_DATE")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.SurveyFacts)
                    .HasForeignKey(d => d.BrandId)
                    .HasConstraintName("FK_SURVEY_FACT_BRAND_MODEL_ID");

                entity.HasOne(d => d.Club)
                    .WithMany(p => p.SurveyFacts)
                    .HasForeignKey(d => d.ClubId)
                    .HasConstraintName("FK_SURVEY_FACT_CLUB_ID");

                entity.HasOne(d => d.EventPlayer)
                    .WithMany(p => p.SurveyFacts)
                    .HasForeignKey(d => d.EventPlayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SURVEY_FACT_EVENT_PLAYER_ID");

                entity.HasOne(d => d.ProductType)
                    .WithMany(p => p.SurveyFacts)
                    .HasForeignKey(d => d.ProductTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SURVEY_FACT_PRODUCT_TYPE_ID");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
