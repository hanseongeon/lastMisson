package com.example.finalTest.Test;

import com.example.finalTest.Exception.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ArticleController {
    private final ArticleService articleService;
    @PostMapping
    public ResponseEntity<?> createArticle(@RequestBody ArticleRequestDTO articleRequestDTO){
        articleService.createArticle(articleRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body("create!");
    }

    @PutMapping
    public ResponseEntity<?> updateArticle(@RequestHeader("id") Long id,@RequestBody ArticleRequestDTO articleRequestDTO){
        try {
            ArticleResponseDTO articleResponseDTO = articleService.updateArticle(id, articleRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(articleResponseDTO);
        }catch (DataNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteArticle(@RequestHeader("id") Long id){
        articleService.deleteArticle(id);
        return ResponseEntity.status(HttpStatus.OK).body("delete!");
    }

    @GetMapping
    public ResponseEntity<?> articleList(@RequestHeader("page") int page){
        Page<ArticleResponseDTO> articleResponseDTOS  = articleService.getList(page);
        return ResponseEntity.status(HttpStatus.OK).body(articleResponseDTOS);
    }
}
