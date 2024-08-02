package com.example.finalTest;

import com.example.finalTest.Test.Article;
import com.example.finalTest.Test.ArticleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FinalTestApplicationTests {
	@Autowired
	private  ArticleRepository articleRepository;
	@Test
	void contextLoads() {
		for(int i = 51; i < 200; i++){
			articleRepository.save(Article.builder().title("페이징 테스트" +i).content("페이징 테스트"+i).build());
		}
	}

}
