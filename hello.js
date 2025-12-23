import OpenAI from "openai";
const client = new OpenAI();

async function run() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content:
      // "The capital of France is"
      "Why is the sky blue?"
    }],
    max_tokens: 6,
    logprobs: true,
    top_logprobs: 3, 
  });

  const choice = response.choices[0];
  const contentLogprobs = choice.logprobs.content;

  console.log(`Assistant said: "${choice.message.content}"\n`);

  contentLogprobs.forEach((tokenData, index) => {

    if (tokenData.top_logprobs) {
      tokenData.top_logprobs.forEach(alt => {
        const altProb = (Math.exp(alt.logprob) * 100).toFixed(5);
        console.log(` - "${alt.token}":  ${alt.logprob.toFixed(2)}  :  ${altProb}%`);
      });
      console.log('\n')
    }
  });
}
run().catch(console.error);
