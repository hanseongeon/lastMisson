package com.example.finalTest.Test;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article,Long>,ArticleRepositoryCustom {
}
