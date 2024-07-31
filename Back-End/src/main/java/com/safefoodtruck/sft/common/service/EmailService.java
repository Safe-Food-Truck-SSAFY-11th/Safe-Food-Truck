package com.safefoodtruck.sft.common.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
@RequiredArgsConstructor
@EnableAsync
@Slf4j
@Transactional(readOnly = true)
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    @Async
    public void sendEmailPassword(String toEmail, String name, String changedPassword){
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(toEmail); // 메일 수신자
            mimeMessageHelper.setSubject("쎄이푸트에서 발송된 " + name + "의 임시 비밀번호 입니다."); // 메일 제목
            mimeMessageHelper.setText(setContext(name, changedPassword), true); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);
            log.info("Succeeded to send Email");
        } catch (Exception e) {
            log.info("Failed to send Email");
            throw new RuntimeException(e);
        }
    }

    //thymeleaf를 통한 html 적용
    public String setContext(String username, String password) {
        Context context = new Context();
        context.setVariable("username", username);
        context.setVariable("password", password);
        return templateEngine.process("send-password", context);
    }
}
