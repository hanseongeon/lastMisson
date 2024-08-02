package com.example.finalTest.Test;

import com.example.finalTest.Exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;


    public void createArticle(ArticleRequestDTO articleRequestDTO){
        articleRepository.save(Article.builder().title(articleRequestDTO.title()).content(articleRequestDTO.content()).build());
    }

    public ArticleResponseDTO updateArticle(Long id, ArticleRequestDTO articleRequestDTO) {
        Article article = articleRepository.findById(id).orElseThrow(()-> new DataNotFoundException("해당하는 게시물이 없습니다."));
        article.setTitle(articleRequestDTO.title());
        article.setContent(articleRequestDTO.content());
        articleRepository.save(article);
        return getDTO(article);
    }

    public ArticleResponseDTO getDTO(Article article){
        return ArticleResponseDTO.builder().id(article.getId()).content(article.getContent()).title(article.getTitle()).build();
    }

    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id).orElseThrow(()-> new DataNotFoundException("해당하는 게시물이 없습니다."));
        articleRepository.delete(article);
    }



    public Page<ArticleResponseDTO> getList(int page) {
        Pageable pageable = PageRequest.of(page,15);
        Page<Article> articleList = articleRepository.getList(pageable);

        return new PageImpl<>(articleList.stream().map(this::getDTO).toList(),pageable,articleList.getTotalElements());
    }
}
