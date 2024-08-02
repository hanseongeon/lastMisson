package com.example.finalTest.Test;

import lombok.Builder;

@Builder
public record ArticleResponseDTO(Long id, String title, String content) {
}
