package com.example.finalTest.Test;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class ArticleRepositoryCustomImpl implements ArticleRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    QArticle qArticle = QArticle.article;

    public Page<Article> getList(Pageable pageable) {
        QueryResults<Article> queryResults = jpaQueryFactory.selectFrom(qArticle)
                .orderBy(qArticle.createDate.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();


        return new PageImpl<>(queryResults.getResults(), pageable, queryResults.getTotal());
    }
}
