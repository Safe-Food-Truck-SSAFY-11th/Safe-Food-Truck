package com.safefoodtruck.sft.reply.domain;

import static jakarta.persistence.FetchType.LAZY;

import com.safefoodtruck.sft.reply.dto.request.ReplyRegistRequestDto;
import com.safefoodtruck.sft.review.domain.Review;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "reply")
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reply {

	@Id
	@Column(name = "reply_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;

	@NotNull
	@OneToOne(fetch = LAZY)
	@JoinColumn(name = "review_id")
	Review review;

	@NotNull
	@JoinColumn(name = "content")
	String content;

	public static Reply of(Review review,
		ReplyRegistRequestDto replyRegistRequestDto) {
		Reply reply = Reply.builder()
			.content(replyRegistRequestDto.content())
			.build();

		reply.setReview(review);

		return reply;
	}

	public void setReview(Review review) {
		this.review = review;
		review.setReply(this);
	}
}
