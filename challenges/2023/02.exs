Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result(input) do
    input
    |> parse_games()
    |> Enum.filter(&within_limits?/1)
    |> Enum.reduce(0, &(Enum.at(&1, 0)["game_no"] + &2))
  end

  def second_result(input) do
    input
    |> parse_games()
    |> Enum.reduce(0, fn rounds, acc ->
      [r, g, b] =
        Enum.reduce(rounds, [0, 0, 0], fn round, [r, g, b] ->
          [max(round["red"], r), max(round["green"], g), max(round["blue"], b)]
        end)

      r * g * b + acc
    end)
  end

  defp within_limits?(rounds) when is_list(rounds), do: Enum.all?(rounds, &within_limits?/1)
  defp within_limits?(r) when is_map(r), do: r["red"] <= 12 && r["green"] <= 13 && r["blue"] <= 14

  defp parse_games(input) do
    input
    |> Enum.with_index(1)
    |> Enum.map(fn {game, game_no} ->
      game
      |> String.split(": ")
      |> List.last()
      |> String.replace(" ", "")
      |> String.split(";")
      |> Enum.map(fn round ->
        colors_and_numbers = %{"red" => 0, "green" => 0, "blue" => 0, "game_no" => game_no}

        round
        |> String.split(",")
        |> Enum.reduce(colors_and_numbers, fn round, acc ->
          ["", number_string, color] = Regex.split(~r/\d+/, round, include_captures: true)
          Map.put(acc, color, String.to_integer(number_string))
        end)
      end)
    end)
  end
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
