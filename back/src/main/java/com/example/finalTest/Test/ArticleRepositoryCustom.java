package com.example.finalTest.Test;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleRepositoryCustom {

    Page<Article> getList(Pageable pageable);
}
